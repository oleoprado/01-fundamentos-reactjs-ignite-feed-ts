import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(['Mandou muito mano!!! Parabens!', 'jdahsjdhagsdgasd 2545', 'laskufas nbsgd ghdgas 3234']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  };

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  };

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('comenta alguma coisa né camarada');
  }

  function deleteComment(comment: string) {
    const commentsWhitoutDeletedOne = comments.filter(element => element !== comment);
    
    setComments(commentsWhitoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={ styles.post }>
      <header>
        <div className={ styles.author }>

          <Avatar src={ author.avatarUrl } />

          <div className={ styles.authorInfo }>
            <strong>{ author.name }</strong>
            <span>{ author.role }</span>
          </div>

        </div>

        <time
          title={ publishedDateFormatted }
          dateTime={ publishedAt.toISOString()}
        >
          { publishedDateRelativeToNow }
        </time>
      </header>

      <div className={ styles.content }>
        {
          content.map(line => {
            switch (line.type) {
              case 'paragraph':
                return <p key={ line.content }>{ line.content }</p>
              case 'link':
                return <p key={ line.content }><a href="#">{ line.content }</a></p>
            }
          })
        }
      </div>

      <form onSubmit={ handleCreateNewComment } className={ styles.commentForm }>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={ handleNewCommentChange }
          onInvalid={ handleNewCommentInvalid }
          required
        />

        <footer>
          <button
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>
      <div className={ styles.commentList }>
        {
          comments.map(comment => {
            return (
              <Comment
                key={ comment }
                content={ comment }
                onDeleteComment={ deleteComment }
              />
            )
          })
        }
      </div>
    </article>
  )
}
