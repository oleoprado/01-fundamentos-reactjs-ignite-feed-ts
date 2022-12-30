import { v4 as uuid } from 'uuid';

import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from './App.module.css';

import './global.css';

// author: { avatarUrl: '', name: '', role: ''}
// publishedAt: Date
// content: string

const posts = [
  {
    id: uuid(),
    author: {
      avatarUrl: 'https://github.com/oleoprado.png',
      name: 'Léo Prado',
      role: 'Jr Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋🏼' },
      { type: 'paragraph', content: 'Acabei de subir um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat 🚀' },
      { type: 'link', content: 'oleoprado/doctorcare' },
    ],
    publishedAt: new Date(),
  },
  {
    id: uuid(),
    author: {
      avatarUrl: 'https://github.com/verdeli.png',
      name: 'Jonathan Verdeli',
      role: 'Enfermeiro / Engenheiro'
    },
    content: [
      { type: 'paragraph', content: 'Fala camaradas ✊🏼' },
      { type: 'paragraph', content: 'A classe trabalhadora é a coluna vertebral da sociedade, mas é frequentemente explorada e oprimida pelo sistema capitalista. É hora do proletariado se levantar e tomar as rédeas da produção, criando uma sociedade justa e igualitária para todos ☭' },
      { type: 'link', content: 'verdeli/vamosFazerRevolucao' },
    ],
    publishedAt: new Date(),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              );
            })
          }
        </main>
      </div>
    </div>
  )
}
