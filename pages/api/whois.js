const whois = require('whois');
import parseWhois from '../../util/parseWhois';

// handles domain whois lookups
export default async function handler(req, res) {
  try {
    // race lookup with 10 second maximum timeout
    const json = await Promise.race([
      new Promise(res => setTimeout(res, 10000)),
      whois.lookup(req.query.domain)
    ]);
    res.status(200).json(json);
  } catch (e) {
    res.status(200).json(null);
  }
}
