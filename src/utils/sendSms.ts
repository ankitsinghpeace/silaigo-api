const https = require('https');

export function sendWhatsAppMessage(message, to) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      integrated_number: '919599916611',
      content_type: 'template',
      payload: {
        messaging_product: 'whatsapp',
        type: 'template',
        template: {
          name: 'auth1',
          language: {
            code: 'en_US',
            policy: 'deterministic',
          },
          namespace: 'ee6cd1c3_b008_43b7_b8e2_2ea07faba725',
          to_and_components: [
            {
              to: [to],
              components: {
                body_1: {
                  type: 'text',
                  value: message,
                },
                button_1: {
                  subtype: 'url',
                  type: 'text',
                  value: message,
                },
              },
            },
          ],
        },
      },
    });

    const options = {
      hostname: 'control.msg91.com',
      port: 443,
      path: '/api/v5/whatsapp/whatsapp-outbound-message/bulk/',
      method: 'POST',
      headers: {
        authkey: '454178AvwWdVMqxRY684267c0P1', // Replace with env variable in production
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(responseData);
          console.log('Message sent successfully:', json);
          if ((json.status.toUpperCase = 'FAIL')) {
            console.error('Failed to parse response:', responseData);
            resolve(false);
          } else {
            console.log('Message sent successfully:', json);
            resolve(true);
          }
        } catch (err) {
          console.error('Failed to parse response:', responseData);
          resolve(false);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e);
      reject(false);
    });

    req.write(data);
    req.end();
  });
}

// Example usage:
// sendWhatsAppMessage("Your message here", "919123456789");

// Usage example:
// const success = await sendWhatsAppMessage("7623", ["91977998298378"]);
// console.log(success); // true or false
