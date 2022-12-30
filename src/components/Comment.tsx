import { useState } from 'react';

import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from './Avatar'

import styles from './Comment.module.css'

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  };

  function handleLikeComment() {
    setLikeCount((like) => like + 1);
  }

  return (
    <div className={ styles.comment }>
      <Avatar hasBorder={ false } src="https://avatars.githubusercontent.com/u/97796193?v=4"/>

      <div className={ styles.commentBox}>
        <div className={ styles.commentContent }>
          <header>
            <div className={ styles.authorAndTime }>
              <strong>Léo Prado</strong>
              <time
                title="11 de Maio às 08:13h"
                dateTime="2022-12-28 19:44:39"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={ handleDeleteComment } title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{ content }</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Likes <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
