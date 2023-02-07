const useTraverseTree = () => {

  const insertNode = function (tree, folder, newFolder) {
    let updatedArr = tree.map((i) => {
      if (i.id === folder.id) {
        return { ...i, items: [newFolder, ...i.items] };
      }
      if (i.items.length > 0) {
        return { ...i, items: insertNode(i.items, folder, newFolder) };
      }
      return i;
    });

    return updatedArr;
  };

  const deleteNode = (arr, item) => {
    let updatedArr = [];
    arr.forEach((node) => {
      if (node.id !== item.id) {
        let items = node.items;
        if (items.length > 0) {
          items = deleteNode(items, item);
        }
        updatedArr.push({ ...node, items: items });
      }
    });
    return updatedArr;
  };

  const renameNode = (tree, folderId, rename) => {
    let updatedArr = tree.map((i) => {
      if (i.id === folderId) {
        return { ...i, name: rename };
      }
      if (i.items.length > 0) {
        return { ...i, items: renameNode(i.items, folderId, rename) };
      }
      return i;
    });

    return updatedArr;
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
