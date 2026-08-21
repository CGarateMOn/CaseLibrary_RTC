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
  }
};

// Applies the current viewed state to a card + its toggle button and wires
// up the click handler. Call this once per rendered card.
function wireViewedToggle(cardEl, toggleEl, itemId) {
  toggleEl.dataset.itemId = itemId;
  applyViewedState(cardEl, toggleEl, ViewedTracker.isViewed(itemId));

  toggleEl.addEventListener("click", () => {
    const newState = ViewedTracker.toggle(itemId);
    applyViewedState(cardEl, toggleEl, newState);
  });
}

function applyViewedState(cardEl, toggleEl, isViewed) {
  cardEl.classList.toggle("is-viewed", isViewed);
  toggleEl.classList.toggle("is-viewed", isViewed);
  toggleEl.textContent = isViewed ? "Done ✓" : "Mark as done";
}
