/** YouTube or Facebook video iframe, same embeds the Wix site used. */
export default function VideoEmbed({ video, title = 'Video', className = '' }) {
  const src =
    video.type === 'facebook'
      ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&autoplay=false&mute=false&show_text=false`
      : `https://www.youtube.com/embed/${video.youtubeId || video.id}?rel=0&theme=dark&controls=1`;

  return (
    <div className={`video-embed ${className}`.trim()}>
      <iframe
        src={src}
        title={video.type === 'facebook' ? 'Facebook video' : `YouTube — ${title}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
