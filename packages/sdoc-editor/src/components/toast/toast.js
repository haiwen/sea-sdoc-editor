import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import Alert from './alert';

const ANIMATION_DURATION = 240;

export default class Toast extends React.PureComponent {
  static propTypes = {
    /**
     * The z-index of the toast.
     */
    zIndex: PropTypes.number,

    /**
     * Duration of the toast.
     */
    duration: PropTypes.number,

    /**
     * Function called when the toast is all the way closed.
     */
    onRemove: PropTypes.func,

    /**
     * The type of the alert.
     */
    intent: PropTypes.oneOf(['none', 'success', 'warning', 'danger']).isRequired,

    /**
     * The title of the alert.
     */
    title: PropTypes.node,

    /**
     * Description of the alert.
     */
    children: PropTypes.node,

    /**
     * When true, show a close icon button inside of the toast.
     */
    hasCloseButton: PropTypes.bool,

    /**
     * When false, will close the Toast and call onRemove when finished.
     */
    isShown: PropTypes.bool
  };

  state = {
    isShown: true,
    height: 0
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isShown !== this.props.isShown) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isShown: this.props.isShown
      });
    }
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = (event) => {
    if (event) {
      event.nativeEvent.stopImmediatePropagation();
      event.stopPropagation();
    }
    this.clearCloseTimer();
    this.setState({
      isShown: false
    });
  };

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  };

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  handleMouseEnter = () => {
    this.clearCloseTimer();
  };

  handleMouseLeave = () => {
    this.startCloseTimer();
  };

  onRef = ref => {
    if (ref === null) return;

    const { height } = ref.getBoundingClientRect();

    this.setState({
      height
    });
  };

  render() {
    return (
      <Transition
        appear
        unmountOnExit
        timeout={ANIMATION_DURATION}
        in={this.state.isShown}
        onExited={this.props.onRemove}
      >
        {state => (
          <div
            data-state={state}
            className={`sdoc-toast-container ${state}`}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            style={{
              height: this.state.height,
              zIndex: this.props.zIndex,
              marginBottom: this.state.isShown ? 0 : -this.state.height
            }}
          >
            <div ref={this.onRef} style={{ padding: 8 }}>
              <Alert
                intent={this.props.intent || 'none'}
                title={this.props.title}
                children={this.props.children || ''}
                isRemovable={this.props.hasCloseButton}
                onRemove={(event) => this.close(event)}
              />
            </div>
          </div>
        )}
      </Transition>
    );
  }
}
