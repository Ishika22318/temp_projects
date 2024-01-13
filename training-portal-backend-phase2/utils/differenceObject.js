exports.hasChanges = (existing, updated) => {
    for (const key in updated) {
      if (updated.hasOwnProperty(key)) {
        if (typeof updated[key] === 'object') {
          if (!(JSON.stringify(existing[key]) === JSON.stringify(updated[key]))) {
            return true;
          }
        } else if (existing[key] !== updated[key]) {
          return true;
        }
      }
    }
    return false;
};