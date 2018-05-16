// @flow
/**
 * Personの変化に検知して動作する処理をまとめたコンポーネント
 * 各コンポーネントに対して不要な依存関係を持ち込まないために使う
 */
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { changeSlides } from '../reducers/slide';
import getSlides from '../api/getSlides';
import getImageURL from '../html/extractFirstImageURL';
import type { Person } from '../models/Person';
import type { Slide } from '../models/Slide';
import type { State } from '../reducers/index';

// Atomフィード内のエントリーからSlideモデルへ変換する
const EntryToSlide = ({ content, link, ...rest }): Promise<Slide> =>
  getImageURL(content.content).then((image: string) => ({
    image,
    url: link.href,
    ...rest,
  }));

const changeSlidesBuilder = (dispatch: Dispatch) => async ({
  speakerdeck,
}: Person) => {
  // 一旦表示してるスライドを消す
  dispatch(changeSlides([]));
  if (speakerdeck) {
    const entries = await getSlides(speakerdeck);
    const slides = await Promise.all(entries.map(EntryToSlide));
    dispatch(changeSlides(slides));
  }
};

type Props = {
  person: Person,
  onChangePerson: (Person) => Promise<void>,
};

export const Component = ({ onChangePerson, person }: Props) => {
  onChangePerson(person);
  return <div style={{ display: 'none' }} />;
};

const mapStateToProps = ({ person }: State) => ({ person });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangePerson: changeSlidesBuilder(dispatch),
});

const ChangePersonHandler = connect(mapStateToProps, mapDispatchToProps)(
  Component,
);

export default ChangePersonHandler;
