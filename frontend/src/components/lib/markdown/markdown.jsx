import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import modestcss from './modest.module.css';

function Markdown({ children }) {
  return (
    <div className={modestcss.modestmarkdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
