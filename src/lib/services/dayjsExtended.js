import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default dayjs;
