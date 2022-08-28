const whois = require('whois');
import parseWhois from '../../util/parseWhois';

// handles domain whois lookups
export default async function handler(req, res) {
  // get domain from query
  const { domain } = req.query;
  // rave timeout with whois lookup
  const result = await Promise.race([
    // five second timeout
    new Promise(resolve => setTimeout(() => {
      resolve(null);
    }, 5000)),
    // whois lookup
    new Promise((resolve) => {
      whois.lookup(domain, (err, data) => {
        if (err) resolve(null);
        let parsed;
        try {
          // try parse domain data
          parsed = parseWhois(data, domain);
        } catch (e) {
          // void parse on error
          parsed = null;
        }
        // resolve with parsed data
        resolve(parsed);
      });
    })
  ]);
  // resolve with result
  res.status(200).json(result);
}
