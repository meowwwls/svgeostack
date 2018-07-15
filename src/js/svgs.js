const SVGs = {
  list: [],
  current: 0,
  setCurrent(i) {
    this.current = i;
    return this.list[i];
  },
  prev() {
    const prev = this.current === 0 ? 0 : this.current - 1;
    this.setCurrent(prev);

    return this.list[prev];
  },
  next() {
    const next =
      this.current === this.list.length - 1 ? this.current : this.current + 1;
    this.setCurrent(next);

    return this.list[next];
  }
};

export default SVGs;
