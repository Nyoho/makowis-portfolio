// @flow
import axios from 'axios';
import type { SpeakerdeckID } from './models/SpeakerdeckID';
// eslint-disable-next-line import/no-extraneous-dependencies
import { feedURL as speakerdeckFeedURL } from './feedURL';

const yqlQuery = (url: string): string =>
  `select * from xml where url = '${url}'`;
const yqlURL = 'https://query.yahooapis.com/v1/public/yql';

export type Entry = {
  id: string,
  published: string,
  updated: string,
  link: {
    href: string,
    rel: string,
    type: string,
  },
  title: string,
  content: {
    type: string,
    content: string,
  },
};

const getYQL = (q: string) =>
  axios.get(yqlURL, {
    params: {
      q,
      format: 'json',
    },
  });

const getSlides = async (speakerdeck: SpeakerdeckID): Promise<Entry[]> =>
  getYQL(yqlQuery(speakerdeckFeedURL(speakerdeck))).then(
    (res) => res.data.query.results.feed.entry,
  );

export default getSlides;
