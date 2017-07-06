import ko from 'knockout';

import persist from './persist';
import persistArray from './persistArray';

ko.extenders.persist = persist;
ko.extenders.persistArray = persistArray;
