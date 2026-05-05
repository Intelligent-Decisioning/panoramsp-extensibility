import React from 'react';

export interface IBigTileTestProps {
  imageUrl: string;
  path: string;
  title: string;
  author: string;
  tags: string[];
}


export const BigTileTest: React.FC<IBigTileTestProps> = (props) => {
  return (
    <div style={{
      padding: '8px 8px 0 0',
      boxSizing: 'border-box',
      width: '100%',
      display: 'block'
    }}>
      <a href={props.path} data-interception="off" rel="noreferrer" style={{
        borderRadius: '8px',
        display: 'block',
        position: 'relative',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit'
      }}>
        <div style={{
          borderRadius: '8px',
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          right: 0,
          top: 0,
          width: '100%',
          position: 'absolute',
        }}>
          <div>
            <img src={props.imageUrl} alt={props.title} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0
            }}
            />
          </div>

          <div style={{
            height: 'auto',
            left: 0,
            right: 0,
            top: 0
          }}>
            <ul style={{
              padding: '4px 0',
              alignItems: 'center',
              display: 'flex',
              height: 'auto',
              listStyle: 'none',
              margin: 0,
              position: 'relative',
            }}>
              {
                props.tags.map((tag, index) => (
                  <li key={index} style={{
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '12px',
                    marginRight: '4px',
                    margin: '0 4px 0 0',
                    minWidth: '28px'
                  }}>
                    {tag}
                  </li>
                ))
              }
            </ul>
          </div>

          <div style={{
            bottom: 0,
            color: '#fff',
            left: 0,
            padding: '8px',
            right: 0,
            height: 'auto',
          position: 'absolute'
          }}>

            <h2 style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '20px',
              margin: '2px 0 0 ',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {props.title}
            </h2>
          </div>
        </div>
      </a >
    </div >
  );
}