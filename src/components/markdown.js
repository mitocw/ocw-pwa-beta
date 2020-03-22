/* eslint-disable react/no-danger */
import React from 'react';
import MarkdownIt from 'markdown-it';
import * as MarkDownItKatex from '@abreto/markdown-it-katex';
import 'katex/dist/katex.css';

const markDown = new MarkdownIt('commonmark');
markDown.use(MarkDownItKatex);

const createHTMLfromMarkdown = (str) => ({ __html: markDown.render(str) });

const Markdown = ({ content }) => (
  <div dangerouslySetInnerHTML={createHTMLfromMarkdown(content)} />
);

export default Markdown;
