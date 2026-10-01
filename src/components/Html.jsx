/** Renders trusted rich text from server/data/site.json (bold / italic / links / <br>). */
export default function Html({ as: Tag = 'span', html, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}
