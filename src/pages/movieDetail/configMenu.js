const menu = (idMovie) => [
    {
      label: "Overview",
      link: "",
      children: [
        {
          label: "Cast & Crew",
          link: `/movie/${idMovie}/cast`,
        },
        {
          label: "Release Dates",
          link: `/movie/${idMovie}/release`,
        },
      ],
    },
    {
      label: "Media",
      link: "",
      children: [
        {
          label: "Backdrops",
          link: `/movie/${idMovie}/backdrops`,
        },
        {
          label: "Posters",
          link: `/movie/${idMovie}/posters`,
        },
        {
          label: "Video",
          link: `/movie/${idMovie}/video`,
        },
      ],
    },
]

export default menu;