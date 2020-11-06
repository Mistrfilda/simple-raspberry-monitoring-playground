import {ConfigDefinition} from "./ConfigDefinition";
import _ from 'lodash';

import {defaultConfig} from "./Default";

const localConfig = _.clone(defaultConfig);

export {localConfig as local};