import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment-timezone';

const imageSource = PropTypes.shape({
  uri: PropTypes.string.isRequired,
});

export default {
  imageSource,

  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),

  person: PropTypes.shape({
    // TODO: expand as we use more of it
    name: PropTypes.string.isRequired,
    imageSource: imageSource.isRequired,
  }),

  podcast: PropTypes.shape({
    title: PropTypes.string.isRequired,
    episodeCount: PropTypes.number,
    lastUpdated: momentPropTypes.momentObj.isRequired,
    imageSource: imageSource.isRequired,
  }),

  meditationCategory: PropTypes.shape({
    title: PropTypes.string.isRequired,
    meditationCount: PropTypes.number,
    imageSource: imageSource.isRequired,
  }),

  liturgy: PropTypes.shape({
    title: PropTypes.string.isRequired,
    liturgyLength: PropTypes.number,
    publishedDate: momentPropTypes.momentObj.isRequired,
    imageSource: imageSource.isRequired,
  }),

  podcastEpisode: PropTypes.shape({
    // TODO: expand as we use more of it
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: momentPropTypes.momentDurationObj,
    publishDate: momentPropTypes.momentObj,
  }),
  liturgyItem: PropTypes.shape({
    // TODO: expand as we use more of it
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: momentPropTypes.momentDurationObj,
    publishDate: momentPropTypes.momentObj,
  }),
  meditation: PropTypes.shape({
    // TODO: expand as we use more of it
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: momentPropTypes.momentDurationObj,
    publishDate: momentPropTypes.momentObj,
  }),
  event: PropTypes.shape({
    // TODO: expand as we use more of it
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    start: momentPropTypes.momentObj.isRequired,
    end: momentPropTypes.momentObj,

    // e.g. 'America/Detroit', 'Europe/Paris'
    timezone: PropTypes.oneOf(moment.tz.names()).isRequired,
  }),
  user: PropTypes.shape({
    // TODO: expand as we use more of it
    thumbUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }),
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: momentPropTypes.momentObj.isRequired,
  }),
};
