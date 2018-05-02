// @flow
import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import './App.css';
import Person from './containers/Person';
import Developers from './containers/Developers';

fontawesome.library.add(brands);

const App = () => (
  <div>
    <main>
      <Person />
      <section className="text-center p-5">
        <h2>Info</h2>
        <p>
          このサイトはポートフォリオというよりReactで何か作ってみようと思ってはじめた実験サイトです。
        </p>
        <p>
          ソースコードは
          <a href="https://github.com/makowis/makowis-portfolio">GitHub</a>
          で公開しています。
        </p>
      </section>
      <section className="text-center text-white bg-info p-5">
        <h2>Developers</h2>
        <Developers />
      </section>
    </main>
  </div>
);

export default App;
