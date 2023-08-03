import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    'Muito Bacana hein? Ficou bonito de ver mesmo',
  ]);
  const [newCommentText, SetNewCommentText] = useState('');

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    SetNewCommentText(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event?.preventDefault();
    setComments([...comments, newCommentText]);
    SetNewCommentText('');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(
    event: InvalidEvent<HTMLTextAreaElement>
  ): void {
    console.log(event.target.setCustomValidity('Esse campo é obrigatório.'));
  }

  const isNewCommmentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((line, index: number) => {
          if (line.type === 'paragraph') {
            return <p key={`paragraph_${index}`}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <a key={`anchor_${index}`}>{line.content}</a>;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommmentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={`${comment}_${index}`}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
