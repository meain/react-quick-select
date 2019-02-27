/**
 * @class QuickSelect
 */

import * as React from "react";

import styles from "./styles.css";

export type Option = { value: any; label: string };
export type Props = {
  style?: React.CSSProperties;
  selected: number;
  options: Option[];
  height?: string;
  width?: string;
  renderer?: (option: Option, index: number) => React.ReactNode;
  trigger?: (option: Option, index: number) => React.ReactNode;
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

  defaultRenderer(option: Option, _index: number, trigger = false) {
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
    this.setState({ ...this.state, hover: false });
    event.stopPropagation();
    const { options, onSelect = () => {} } = this.props;
    onSelect(options[i], i);
  }

  render() {
    let {
      style,
      options,
      selected = 0,
      renderer = this.defaultRenderer,
      trigger,
      height = "200px",
      width
    } = this.props;

    // const clname = updateMaxHeight(height, styles);

    const defaultTrigger = (option: Option) =>
      this.defaultRenderer(option, selected, true);
    trigger = trigger || defaultTrigger;

    const { hover } = this.state;

    const optionsStyle: React.CSSProperties = {};
    if (hover) {
      optionsStyle.overflowY = "auto";
      optionsStyle.maxHeight = height;
      if (width) optionsStyle.width = width;
    }

    return (
      <div
        className={styles.wrapper}
        style={style}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <div className={styles.trigger}>
          {trigger(options[selected], selected) ||
            renderer(options[selected], selected)}
        </div>
        <div className={styles.items} style={optionsStyle}>
          {options.map((option, i) => (
            <div
              key={i}
              className={styles.item}
              onClick={e => this.onItemSelect(e, i)}
            >
              {renderer(option, i)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
