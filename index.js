document.addEventListener("DOMContentLoaded", function () {
  const shoppingList = [];
  const addItemInput = document.getElementById("item-input");
  const addBtn = document.getElementById("add-button");
  const clearBtn = document.getElementById("clear-button");
  const listContainer = document.getElementById("list");

  addBtn.addEventListener("click", function () {
    const newItem = addItemInput.value.trim();
    if (newItem !== "") {
      shoppingList.push(newItem);
      addItemInput.value = "";
      renderList();
    }
  });

  clearBtn.addEventListener("click", function () {
    shoppingList.length = 0;
    renderList();
  });

  listContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const itemIndex = Array.from(listContainer.children).indexOf(
        event.target
      );
      if (itemIndex !== -1) {
        shoppingList[itemIndex] = shoppingList[itemIndex] + " (purchased)";
        renderList();
      }
    } else if (
      event.target.tagName === "BUTTON" &&
      event.target.classList.contains("remove-btn")
    ) {
      const itemIndex = Array.from(listContainer.children).indexOf(
        event.target.parentElement
      );
      if (itemIndex !== -1) {
        shoppingList.splice(itemIndex, 1);
        renderList();
      }
    }
  });

  function renderList() {
    listContainer.innerHTML = "";
    shoppingList.forEach(function (item) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      if (item.includes("(purchased)")) {
        listItem.classList.add("purchased");
      }

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      listItem.appendChild(removeBtn);

      listContainer.appendChild(listItem);
    });
  }
});
