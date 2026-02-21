const dailyBtn = document.querySelector("#daily");
const weeklyBtn = document.querySelector("#weekly");
const monthlyBtn = document.querySelector("#monthly");

let activities = [];

const labelMap = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

function titleToId(title) {
  return title.toLowerCase().replaceAll(" ", "-");
}

function render(timeframe) {
  activities.forEach((activity) => {
    const id = titleToId(activity.title);
    const card = document.querySelector(`#${id}`);
    if (!card) return;

    const currentEl = card.querySelector(".current-hrs");
    const previousEl = card.querySelector(".previous-hrs");

    const tf = activity.timeframes[timeframe];
    currentEl.textContent = `${tf.current}hrs`;
    previousEl.textContent = `${labelMap[timeframe]} - ${tf.previous}hrs`;
  });
}

function setActiveBtn(activeBtn) {
  dailyBtn.classList.remove("active");
  dailyBtn.setAttribute("aria-pressed", "false");
  weeklyBtn.classList.remove("active");
  weeklyBtn.setAttribute("aria-pressed", "false");
  monthlyBtn.classList.remove("active");
  monthlyBtn.setAttribute("aria-pressed", "false");
  activeBtn.classList.add("active");
  activeBtn.setAttribute("aria-pressed", "true");
}

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    activities = data;
    render("daily");
    setActiveBtn(dailyBtn);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

dailyBtn.addEventListener("click", (e) => {
  render("daily");
  setActiveBtn(dailyBtn);
});

weeklyBtn.addEventListener("click", (e) => {
  render("weekly");
  setActiveBtn(weeklyBtn);
});

monthlyBtn.addEventListener("click", (e) => {
  render("monthly");
  setActiveBtn(monthlyBtn);
});
