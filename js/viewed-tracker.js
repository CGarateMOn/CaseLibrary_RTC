// Shared localStorage-backed "viewed / consumed" tracker.
// Schema: { "<item-id>": true, ... } stored under a versioned key so future
// schema changes don't collide with stale data from an older version.
const ViewedTracker = {
  _KEY: "rtc_viewed_items_v1",

  _read() {
    try {
      const raw = localStorage.getItem(this._KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  },

  _write(obj) {
    try {
      localStorage.setItem(this._KEY, JSON.stringify(obj));
    } catch (err) {
      // localStorage unavailable (private mode, quota, etc.) — fail silently.
    }
  },

  isViewed(id) {
    return Boolean(this._read()[id]);
  },

  markViewed(id) {
    const state = this._read();
    state[id] = true;
    this._write(state);
  },

  markUnviewed(id) {
    const state = this._read();
    delete state[id];
    this._write(state);
  },

  toggle(id) {
    const newState = !this.isViewed(id);
    if (newState) {
      this.markViewed(id);
    } else {
      this.markUnviewed(id);
    }
    return newState;
  },

  countViewed(items) {
    return items.filter((item) => this.isViewed(item.id)).length;
  }
};

// Wires a "Mark as done" toggle button onto a card. `onToggle(newState)` is
// called after the state is persisted, so callers can re-sort a list or
// refresh a progress counter in response to the click.
function wireViewedToggle(cardEl, toggleEl, itemId, onToggle) {
  toggleEl.dataset.itemId = itemId;
  applyViewedState(cardEl, toggleEl, ViewedTracker.isViewed(itemId));

  toggleEl.addEventListener("click", () => {
    const newState = ViewedTracker.toggle(itemId);
    applyViewedState(cardEl, toggleEl, newState);
    if (newState) {
      // Restart the "satisfaction" pulse even on rapid re-clicks.
      toggleEl.classList.remove("pulse");
      void toggleEl.offsetWidth;
      toggleEl.classList.add("pulse");
    }
    if (onToggle) onToggle(newState);
  });

  toggleEl.addEventListener("animationend", () => {
    toggleEl.classList.remove("pulse");
  });
}

function applyViewedState(cardEl, toggleEl, isViewed) {
  cardEl.classList.toggle("is-viewed", isViewed);
  toggleEl.classList.toggle("is-viewed", isViewed);
  toggleEl.textContent = isViewed ? "Done ✓" : "Mark as done";
}

// Renders a "3/5 done" progress badge (with a proportional fill bar) into
// `el` for the given items.
function renderProgress(el, items) {
  if (!el) return;
  const done = ViewedTracker.countViewed(items);
  const total = items.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  el.innerHTML = `
    <span>${done}/${total} done</span>
    <span class="progress__bar"><span class="progress__bar-fill" style="width:${pct}%"></span></span>
  `;
}
