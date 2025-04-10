
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, website, additionalInfo } = await req.json();

    if (!companyName) {
      return new Response(
        JSON.stringify({ error: "Company name is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Enriching data for: ${companyName}, Website: ${website || 'N/A'}`);

    // Create a detailed prompt for OpenAI based on available information
    let researchPrompt = `Research the company "${companyName}"`;
    if (website) {
      researchPrompt += ` with website ${website}`;
    }
    if (additionalInfo) {
      researchPrompt += `. Additional context: ${additionalInfo}`;
    }
    
    researchPrompt += `. Provide the following information in JSON format:
    1. A detailed description of what the company does (1-2 paragraphs)
    2. Their main products or services (as array of strings)
    3. The industry they operate in
    4. Common challenges companies in this industry face (as array of strings)
    5. Any recent news or developments about the company if available
    6. Likely pain points they might have (as array of strings)
    7. Their company size if known
    8. Their location if known
    
    Format your response as valid JSON with these keys: description, productsServices, industry, industryChallenges, recentNews, painPoints, size, location.
    Only include verifiable information. If any information is not available or uncertain, omit that field from the JSON rather than guessing.`;

    // Request to OpenAI for company research
    const researchResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a business intelligence researcher who provides accurate, factual information about companies. Respond ONLY with the requested JSON format.' },
          { role: 'user', content: researchPrompt }
        ],
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    const researchData = await researchResponse.json();
    
    if (!researchData.choices || researchData.choices.length === 0) {
      console.error("Unexpected response from OpenAI:", researchData);
      return new Response(
        JSON.stringify({ error: "Failed to get research data" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the research content as JSON
    let enrichmentData;
    try {
      const content = researchData.choices[0].message.content;
      enrichmentData = JSON.parse(content);
      console.log("Successfully parsed enrichment data");
    } catch (error) {
      console.error("Failed to parse JSON from OpenAI response:", error);
      return new Response(
        JSON.stringify({ error: "Failed to process research data" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create email template based on research
    const emailPrompt = `
    Create a personalized outreach email to ${companyName}, which operates in the ${enrichmentData.industry || 'business'} industry.
    
    Based on this information about them:
    - Description: ${enrichmentData.description || 'Unknown'}
    - Products/Services: ${JSON.stringify(enrichmentData.productsServices || [])}
    - Industry Challenges: ${JSON.stringify(enrichmentData.industryChallenges || [])}
    - Pain Points: ${JSON.stringify(enrichmentData.painPoints || [])}
    - Recent News: ${enrichmentData.recentNews || 'None available'}
    
    The email should:
    1. Have a compelling subject line
    2. Start with a personal observation about their business or recent development
    3. Address 1-2 specific pain points they might have
    4. Briefly suggest how your solution could help with these pain points
    5. End with a soft call to action for a meeting or call
    6. Include placeholders for the sender's information
    
    Write this email as if it's ready to send - make it sound natural and conversational, not like a template. Don't use placeholders for the company information, use what you know. Keep it under 200 words.`;

    // Request to OpenAI for personalized email
    const emailResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert B2B sales copywriter who creates personalized outreach emails based on company research. Your emails are specific, concise, and compelling.' },
          { role: 'user', content: emailPrompt }
        ],
        temperature: 0.7, // Slightly higher temperature for creativity in writing
      }),
    });

    const emailData = await emailResponse.json();
    
    if (!emailData.choices || emailData.choices.length === 0) {
      console.error("Unexpected response from OpenAI for email:", emailData);
      return new Response(
        JSON.stringify({ error: "Failed to generate email" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const personalizedEmail = emailData.choices[0].message.content;
    
    // Combine enrichment data with email
    const result = {
      company_name: companyName,
      website: website || "",
      industry: enrichmentData.industry || "",
      size: enrichmentData.size || "",
      location: enrichmentData.location || "",
      status: "completed",
      enrichment: {
        description: enrichmentData.description || "",
        productsServices: enrichmentData.productsServices || [],
        industryChallenges: enrichmentData.industryChallenges || [],
        recentNews: enrichmentData.recentNews || "",
        painPoints: enrichmentData.painPoints || []
      },
      email: personalizedEmail
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enrich-leads function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
