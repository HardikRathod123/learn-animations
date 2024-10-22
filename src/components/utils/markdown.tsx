import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              // @ts-ignore
              style={atomDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {props.children}
          </a>
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="my-4 leading-relaxed text-gray-700" />
        ),
        h1: ({ node, ...props }) => (
          <h1 {...props} className="my-6 text-4xl font-bold text-gray-900" />
        ),
        h2: ({ node, ...props }) => (
          <h2
            {...props}
            className="my-5 text-3xl font-semibold text-gray-900"
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            {...props}
            className="my-4 text-2xl font-semibold text-gray-900"
          />
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className="my-4 list-inside list-disc pl-4" />
        ),
        ol: ({ node, ...props }) => (
          <ol {...props} className="my-4 list-inside list-decimal pl-4" />
        ),
        li: ({ node, ...props }) => <li {...props} className="my-2" />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600"
          />
        ),
        img: ({ node, ...props }) => (
          <img
            {...props}
            className="my-4 h-auto max-w-full rounded-lg shadow-md"
          />
        ),
        table: ({ node, ...props }) => (
          <div className="my-4 overflow-x-auto">
            <table {...props} className="min-w-full divide-y divide-gray-200" />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th
            {...props}
            className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          />
        ),
        td: ({ node, ...props }) => (
          <td
            {...props}
            className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
          />
        ),
      }}
      className="markdown prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
    >
      {children}
    </ReactMarkdown>
  )
}
