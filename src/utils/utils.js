export function toggleRowStatus(statusArr, row, newVal) {
    let changed = false;
    const index = statusArr.indexOf(row);
    const included = index !== -1;
  
    const addRow = () => {
      statusArr.push(row);
      changed = true;
    };
    const removeRow = () => {
      statusArr.splice(index, 1);
      changed = true;
    };
  
    if (typeof newVal === 'boolean') {
      if (newVal && !included) {
        addRow();
      } else if (!newVal && included) {
        removeRow();
      }
    } else {
      if (included) {
        removeRow();
      } else {
        addRow();
      }
    }
    return changed;
  }