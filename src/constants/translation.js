import React, { Context } from 'react';
import { languageDictionary } from '../../assets/locale/index';

/// NOTE ** this is only if you don't want to use i18n library.
//  right now this project is set up with i18n lib
//  This is a lightweight solution for translation
//  Needs to be More optimized using context etc.

export const t = ({ locale, text }) => languageDictionary.languageSet[locale][text];
