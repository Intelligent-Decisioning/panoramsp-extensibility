import React from 'react';

import styles from './BigTileTest.module.scss';

export interface IBigTileTestProps {
  imageUrl: string;
  path: string;
  title: string;
  author: string;
  tags: string[];
}


export const BigTileTest: React.FC<IBigTileTestProps> = (props) => {
  return (
    <div className={styles.bigTile}>
      <a href={props.path} data-interception="off" rel="noreferrer">
        <div className={styles.imageArea}>
          <div>
            <img src={props.imageUrl} alt={props.title}
            />
          </div>
        </div>
        <div className={styles.tagsContainer}>
          <ul className={styles.tags}>
            {
              props.tags.map((tag, index) => (
                <li key={index} className={styles.tag}>
                  {tag}
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.info}>
          <h2>
            {props.title}
          </h2>
        </div>
      </a >
    </div >
  );
}