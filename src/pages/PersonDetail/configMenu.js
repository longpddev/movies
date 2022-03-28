const menu = (idPerson) => [
    {
      label: "Overview",
      link: "",
      children: [
        {
          label: "Translations",
          link: `/person/${idPerson}/translations`,
        },
        {
          label: "Changes",
          link: `/person/${idPerson}/changes`,
        },
      ],
    },
    {
      label: "Media",
      link: "",
      children: [
        {
          label: "Profiles",
          link: `/person/${idPerson}/images/profiles`,
        },
      ],
    },
]

export default menu;