/**
 * @class QuickSelect
 */

import * as React from "react";

import styles from "./styles.css";

export type Option = { value: string; label: string };
export type Props = {
  selected: number;
  options: Option[];
  height?: string;
  width?: string;
  renderer: (option: Option) => React.ReactNode;
  trigger?: (option: Option) => React.ReactNode;
  onSelect?: (option: Option, index: number) => void;
};
type State = {
  hover: boolean;
};

export default class QuickSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hover: false };
  }

  defaultRenderer(option: Option, trigger = false) {
    return (
      <div className={trigger ? styles.defaulttrigger : styles.defaultitem}>
        {option.label}
      </div>
    );
  }

  toggleHover(hover: boolean) {
    this.setState({ ...this.state, hover });
  }

  onItemSelect(event: React.MouseEvent<HTMLElement>, i: number) {
    event.stopPropagation();
    const { options, onSelect = () => {} } = this.props;
    onSelect(options[i], i);
  }

  render() {
    let {
      options,
      selected = 0,
      renderer = this.defaultRenderer,
      trigger,
      height = "200px",
      width
    } = this.props;

    // const clname = updateMaxHeight(height, styles);

    const defaultTrigger = (option: Option) =>
      this.defaultRenderer(option, true);
    trigger = trigger || defaultTrigger;

    const { hover } = this.state;

    const style: React.CSSProperties = {};
    if (hover) {
      style.maxHeight = height;
      if (width) style.width = width;
    }

    return (
      <div
        className={styles.wrapper}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <div className={styles.trigger}>
          {trigger(options[selected]) || renderer(options[selected])}
        </div>
        <div className={styles.items} style={style}>
          {options.map((option, i) => (
            <div
              key={i}
              className={styles.item}
              onClick={e => this.onItemSelect(e, i)}
            >
              {renderer(option)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
