import {NavLink} from "react-router-dom";
import styles from "./NavItem.module.css";
import React, {useState} from "react";

export default function NavItem({icon, path, dataTestId, label}: Props) {

  const [labelStyles, setLabelStyles] = useState({display: 'none'})

  return (
      <li
          className="relative mb-16"
          data-testid={dataTestId}
          onMouseEnter={() => setLabelStyles({display: 'block'})}
          onMouseLeave={() => setLabelStyles({display: 'none'})}
          >
        <NavLink
            end
            to={path}
            className={({isActive}) => isActive ? styles.customActiveLinks : styles.customLinks }
            >
          <div className="active-label"/>
          {icon}
        </NavLink>
        <span
            className="absolute block top-1 left-14 rounded bg-bubble-label px-3"
            data-testid="label"
            style={labelStyles}
            >
          <span
              className="block text-xs text-white my-auto py-0.5"
            >{label}
          </span>
        </span>
      </li>
  )
}

interface Props {
  icon: JSX.Element
  path: string
  dataTestId: string
  label: string
}
