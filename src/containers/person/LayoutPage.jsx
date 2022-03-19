import React from 'react';
import { useParams } from 'react-router-dom';

import SeconMenu from '../../components/SeconMenu';
const LayoutPage = ({children}) => {
  const { id: idPerson } = useParams();
  const menu = [
    {
      label: "Overview",
      link: "",
      children: [
        {
          label: "Translations",
          link: `/person/${idPerson}/translations`
        },
        {
          label: "Changes",
          link: `/person/${idPerson}/changes`
        }
      ]
    },
    {
      label: "Media",
      link: "",
      children: [
        {
          label: "Profiles",
          link: `/person/${idPerson}/images/profiles`
        }
      ]
    }
  ]
  return (
    <>
        <SeconMenu
          menu={menu}
        />
        {children}
    </>
  )
}

export default LayoutPage