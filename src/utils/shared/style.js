import {
  faClock,
  faBan,
  faCheckCircle,
  faRunning,
  faHourglassEnd,
  faStar,
  faThumbsUp,
  faCalendarCheck,
  faHourglassHalf,
  faTools,
  faToilet,
  faPlug,
  faSnowflake,
  faSatelliteDish,
  faCouch,
  faBlenderPhone,
  faSpider,
  faScrewdriver,
  faPaintRoller,
  faBroom,
  faTint,
  faRoad,
  faCamera,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';

const getRequestColor = status => {
  const { WARNING, LIGHT_RED, SUCCESS, PRIMARY, CYAN } = COLORS;

  let color;

  if (status === 'pending') color = COLORS_VALUES[WARNING];
  if (status === 'canceled') color = COLORS_VALUES[LIGHT_RED];
  if (status === 'done') color = COLORS_VALUES[SUCCESS];
  if (status === 'active') color = COLORS_VALUES[PRIMARY];
  if (status === 'timed-out') color = COLORS_VALUES[WARNING];
  if (status === 'rated') color = COLORS_VALUES[SUCCESS];
  if (status === 'reviewed') color = COLORS_VALUES[SUCCESS];
  if (status === 'available') color = COLORS_VALUES[PRIMARY];
  if (status === 'unavailable') color = COLORS_VALUES[LIGHT_RED];
  if (status === 'postponed') color = COLORS_VALUES[CYAN];

  return color;
};

const getRequestIcon = status => {
  let Icon;

  if (status === 'pending') Icon = faClock;
  if (status === 'canceled') Icon = faBan;
  if (status === 'done') Icon = faCheckCircle;
  if (status === 'active') Icon = faRunning;
  if (status === 'timed-out') Icon = faHourglassEnd;
  if (status === 'rated') Icon = faStar;
  if (status === 'reviewed') Icon = faThumbsUp;
  if (status === 'available') Icon = faCalendarCheck;
  if (status === 'unavailable') Icon = faBan;
  if (status === 'postponed') Icon = faHourglassHalf;

  return Icon;
};

const getFieldIcon = field => {
  let Icon;

  if (field === 'plumbing') Icon = faToilet;
  if (field === 'electrical') Icon = faPlug;
  if (field === 'air-conditioning') Icon = faSnowflake;
  if (field === 'satellite-tv') Icon = faSatelliteDish;
  if (field === 'furniture-transportation') Icon = faCouch;
  if (field === 'home-appliances') Icon = faBlenderPhone;
  if (field === 'bug-extermination') Icon = faSpider;
  if (field === 'carpentry') Icon = faScrewdriver;
  if (field === 'painting') Icon = faPaintRoller;
  if (field === 'cleaning') Icon = faBroom;
  if (field === 'water-saving') Icon = faTint;
  if (field === 'paved') Icon = faRoad;
  if (field === 'cameras') Icon = faCamera;
  if (field === 'reconditioning') Icon = faTools;
  if (field === 'mobiles') Icon = faMobileAlt;

  return Icon;
};

const getTransactionColor = status => {
  const { WARNING, LIGHT_RED, SUCCESS } = COLORS;

  let color;

  if (status === 'pending') color = COLORS_VALUES[WARNING];
  if (status === 'approved') color = COLORS_VALUES[SUCCESS];
  if (status === 'rejected') color = COLORS_VALUES[LIGHT_RED];

  return color;
};

const getTicketStatusColor = status => {
  const { WARNING, LIGHT_RED, SUCCESS, PLACEHOLDER_GREY } = COLORS;

  let color;

  if (status === 'Solving') color = COLORS_VALUES[WARNING];
  else if (status === 'Solved') color = COLORS_VALUES[SUCCESS];
  else if (status === 'Open') color = COLORS_VALUES[LIGHT_RED];
  else color = COLORS_VALUES[PLACEHOLDER_GREY];

  return color;
};

export { getRequestColor, getRequestIcon, getFieldIcon, getTransactionColor, getTicketStatusColor };
