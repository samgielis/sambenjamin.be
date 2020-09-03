import React from "react";

type ScrollToTopProps = {
  location: any;
};
class ScrollToTop extends React.Component<any, any> {
  componentDidUpdate(props: ScrollToTopProps) {
    if (this.props.location !== props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
