
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
    const requestData = await req.json();
    
    // Check if this is just an API key status check
    if (requestData.checkApiKeyStatus) {
      return new Response(
        JSON.stringify({ hasOpenAIKey: !!openAIApiKey }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { companyName, website, additionalInfo, regenerateEmailOnly, existingEnrichmentData, industry } = requestData;

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

    console.log(`Enriching data for hemp company: ${companyName}, Website: ${website || 'N/A'}`);

    // If we're just regenerating the email and already have enrichment data
    if (regenerateEmailOnly && existingEnrichmentData) {
      console.log("Regenerating email only with existing enrichment data");
      
      // Create email template based on research
      const emailPrompt = `
      Create a personalized outreach email to ${companyName}, which operates in the hemp industry.
      
      Based on this information about them:
      - Description: ${existingEnrichmentData.description || 'Unknown'}
      - Products/Services: ${JSON.stringify(existingEnrichmentData.productsServices || [])}
      - Industry Challenges: ${JSON.stringify(existingEnrichmentData.industryChallenges || [])}
      - Pain Points: ${JSON.stringify(existingEnrichmentData.painPoints || [])}
      - Recent News: ${existingEnrichmentData.recentNews || 'None available'}
      - Hemp Specific: ${JSON.stringify(existingEnrichmentData.hempSpecific || {})}
      
      The email should:
      1. Have a compelling subject line relevant to hemp industry
      2. Start with a personal observation about their hemp business or recent development
      3. Address 1-2 specific pain points they might have in the hemp industry
      4. Briefly suggest how your solution could help with these pain points
      5. End with a soft call to action for a meeting or call
      6. Include placeholders for the sender's information as [Your Name], [Your Company], and [Contact Information]
      
      Write this email as if it's ready to send - make it sound natural and conversational, not like a template. Don't use placeholders for the company information, use what you know. Reference specific hemp industry terminology where appropriate. NEVER use phrases like "unknown industry" or "unknown location" - if you don't have info, craft the email without mentioning those aspects. Keep it under 200 words.`;

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
            { role: 'system', content: 'You are an expert B2B sales copywriter specializing in the hemp industry. You create personalized outreach emails based on company research. Your emails are specific to hemp businesses, addressing their unique challenges in compliance, banking, supply chain, and market access. Use appropriate industry terminology for CBD, extraction methods, cultivation, etc.' },
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
      
      // Return just the email
      return new Response(
        JSON.stringify({ email: personalizedEmail }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a detailed prompt for OpenAI based on available information
    let researchPrompt = `Research the hemp company "${companyName}"`;
    if (website) {
      researchPrompt += ` with website ${website}`;
    }
    if (additionalInfo) {
      researchPrompt += `. Additional context: ${additionalInfo}`;
    }
    
    researchPrompt += `. Provide the following information in JSON format:
    1. A detailed description of what the hemp company does (1-2 paragraphs)
    2. Their main hemp products or services (as array of strings)
    3. Common challenges hemp companies in this industry face (as array of strings)
    4. Any recent news or developments about the company if available
    5. Likely pain points they might have as a hemp business (as array of strings)
    6. Their company size if known
    7. Their location if known
    8. Hemp-specific information including:
       - Cultivation methods they use (array of strings)
       - Any certifications they have (array of strings)
       - THC content in their products (string)
       - CBD content in their products (string)
       - Products offered (array of strings)
       - Extraction methods used (array of strings)
       - Sustainability practices (array of strings)
       - State compliance status (string)
    
    Format your response as valid JSON with these keys: description, productsServices, industryChallenges, recentNews, painPoints, size, location, hempSpecific (with nested keys for hemp-specific information).
    Only include verifiable information. If any information is not available or uncertain, omit that field from the JSON rather than guessing or writing "unknown".`;

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
          { role: 'system', content: 'You are a business intelligence researcher who specializes in the hemp industry. You provide accurate, factual information about hemp companies. Respond ONLY with the requested JSON format. Never use "unknown" in your responses - simply omit fields where data isn\'t available.' },
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
    let companyEnrichmentData;
    try {
      const content = researchData.choices[0].message.content;
      companyEnrichmentData = JSON.parse(content);
      console.log("Successfully parsed enrichment data for hemp company");
    } catch (error) {
      console.error("Failed to parse JSON from OpenAI response:", error);
      return new Response(
        JSON.stringify({ error: "Failed to process research data" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create email template based on hemp industry research
    const emailPrompt = `
    Create a personalized outreach email to ${companyName}, which operates in the hemp industry.
    
    Based on this information about them:
    - Description: ${companyEnrichmentData.description || ''}
    - Products/Services: ${JSON.stringify(companyEnrichmentData.productsServices || [])}
    - Industry Challenges: ${JSON.stringify(companyEnrichmentData.industryChallenges || [])}
    - Pain Points: ${JSON.stringify(companyEnrichmentData.painPoints || [])}
    - Recent News: ${companyEnrichmentData.recentNews || ''}
    - Hemp Specific Info: ${JSON.stringify(companyEnrichmentData.hempSpecific || {})}
    
    The email should:
    1. Have a compelling subject line relevant to the hemp industry
    2. Start with a personal observation about their hemp business or recent development
    3. Address 1-2 specific pain points they might have in the hemp industry
    4. Briefly suggest how your solution could help with these hemp-specific pain points
    5. End with a soft call to action for a meeting or call
    6. Include placeholders for the sender's information as [Your Name], [Your Company], and [Contact Information]
    
    Write this email as if it's ready to send - make it sound natural and conversational, not like a template. Don't use placeholders for the company information, use what you know. Reference specific hemp industry terminology where appropriate. NEVER use phrases like "unknown industry" or "unknown location" - if you don't have info, craft the email without mentioning those aspects. Keep it under 200 words.`;

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
          { role: 'system', content: 'You are an expert B2B sales copywriter specializing in the hemp industry. You create personalized outreach emails based on company research. Your emails are specific to hemp businesses, addressing their unique challenges in compliance, banking, supply chain, and market access. Use appropriate industry terminology for CBD, extraction methods, cultivation, etc.' },
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
      industry: "Hemp",
      size: companyEnrichmentData.size || "",
      location: companyEnrichmentData.location || "",
      status: "completed",
      enrichment: {
        description: companyEnrichmentData.description || "",
        productsServices: companyEnrichmentData.productsServices || [],
        industryChallenges: companyEnrichmentData.industryChallenges || [],
        recentNews: companyEnrichmentData.recentNews || "",
        painPoints: companyEnrichmentData.painPoints || [],
        hempSpecific: companyEnrichmentData.hempSpecific || {
          stateCompliance: "Unknown compliance status",
          thcContent: "<0.3% THC (presumed for compliance)",
          productsOffered: ["Hemp products"]
        }
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
