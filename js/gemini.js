/**
 * ============================================
 * GEMINI AI SERVICE (Namkanda)
 * ============================================
 * Handles communication with Gemini 2.0 Flash API
 */

const GeminiService = {
    API_KEY: 'AIzaSyDQFK67pVqVy25xtf3I_DpuFHAB552nVoU',
    MODEL: 'gemini-1.5-flash',
    URL: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',

    SYSTEM_PROMPT: `Wewe ni "Namkanda", mwanachama mtaalam na rafiki katika mfumo wa kujifunza (LMS) wa Soweto Secondary School. 
    Kazi yako ni kushiriki katika majadiliano ya mazingira. 
    Lugha: Kiswahili fasaha na Kiingereza inapobidi.
    Sifa: Mtaalam, Rafiki, Mwepesi kujibu, na Mhimizaji. 
    Majibu yako yawe mafupi na ya kibinadamu.`,

    /**
     * Generate response from Gemini
     */
    async generateResponse(userInput, context = []) {
        try {
            // High-compatibility format: embed instructions as the first turn
            let contents = [
                {
                    role: 'user',
                    parts: [{ text: "MAELEKEZO: " + this.SYSTEM_PROMPT }]
                },
                {
                    role: 'model',
                    parts: [{ text: "Nimeelewa. Nitajibu kama Namkanda, mshiriki mzoefu wa Soweto Secondary School." }]
                }
            ];

            // Add history
            if (context && context.length > 0) {
                context.forEach(msg => {
                    const role = msg.userId === 0 ? 'model' : 'user';
                    if (contents[contents.length - 1].role === role) {
                        contents[contents.length - 1].parts[0].text += "\n" + msg.content;
                    } else {
                        contents.push({
                            role: role,
                            parts: [{ text: msg.content }]
                        });
                    }
                });
            }

            // Ensure the last role is 'user' for the final turn
            contents.push({
                role: 'user',
                parts: [{ text: userInput }]
            });

            console.log('Sending request to Gemini (Universal Fix)...');

            const response = await fetch(`${this.URL}?key=${this.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    }
                })
            });

            const data = await response.json();

            if (data.candidates && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error('Gemini API Error Detail:', data);
                if (data.error) {
                    if (data.error.status === 'RESOURCE_EXHAUSTED') {
                        return `Samahani, nimeuzuliwa maswali mengi! API (1.5 Flash) imefikia kikomo cha muda. Tafadhali subiri sekunde 60 kisha ujaribu tena.`;
                    }
                    return `Hitilafu ya Kiufundi (${data.error.status}): ${data.error.message}`;
                }
                return "Samahani, nimepata hitilafu kidogo katika kufikiri. Unaweza kurudia swali lako?";
            }
        } catch (error) {
            console.error('Gemini Service Error:', error);
            return "Samahani, inaonekana sipo hewani kwa sasa. Nitarejea hivi punde!";
        }
    }
};
