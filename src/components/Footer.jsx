import { BRAND } from '../config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Cyber Inu ($CYBERINU) is a community-driven Solana token project. This site is unofficial
        informational content and is not financial advice. Always do your own research. Digital assets
        are volatile — never risk more than you can afford to lose.
      </p>
      <div className="footer-links">
        <a href={BRAND.pumpUrl} target="_blank" rel="noopener noreferrer">pump.fun</a>
        <a href={'https://solscan.io/token/' + BRAND.ca} target="_blank" rel="noopener noreferrer">Solscan</a>
        <a href={BRAND.xUrl} target="_blank" rel="noopener noreferrer">X / Twitter</a>
        <a href={'https://x.com/search?q=%24CYBERINU&f=live'} target="_blank" rel="noopener noreferrer">Live search</a>
      </div>
    </footer>
  );
}
