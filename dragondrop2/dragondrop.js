const draggables = document.querySelectorAll(".draggable")
const containers = document.querySelectorAll(".container")

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging")
  })

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging")
  })
})

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientX, e.clientY)
    const draggable = document.querySelector(".dragging")
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, x, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ]

  let closest = null
  let closestDistance = Number.POSITIVE_INFINITY

  draggableElements.forEach((child) => {
    const box = child.getBoundingClientRect()
    const offsetX = x - box.left - box.width / 2
    const offsetY = y - box.top - box.height / 2
    const distance = Math.hypot(offsetX, offsetY)

    if (distance < closestDistance) {
      closestDistance = distance
      closest = child
    }
  })

  return closest
}
