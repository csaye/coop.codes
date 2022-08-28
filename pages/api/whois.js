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
  ]);
  // resolve with result
  res.status(200).json(result);
}
