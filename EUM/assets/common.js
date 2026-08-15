(() => {
  const forms = document.querySelectorAll(".consult-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      window.alert("상담 신청이 완료되었습니다.");
      form.reset();
    });
  });

  const centerSection = document.querySelector("#regionalCenters");
  if (!centerSection) return;

  const mapImage = centerSection.querySelector("#regionalCenterMap");

  const activateSubTab = (button) => {
    const panel = button.closest(".regional-centers__panel");
    if (!panel) return;

    const targetList = panel.querySelector(`#${button.dataset.centerList}`);

    panel.querySelectorAll(".regional-centers__sub-tab").forEach((tab) => {
      tab.classList.remove("is-active");
      tab.setAttribute("aria-selected", "false");
    });

    panel.querySelectorAll(".regional-centers__list").forEach((list) => {
      list.classList.remove("is-active");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");

    if (targetList) {
      targetList.classList.add("is-active");
      targetList.scrollTop = 0;
    }

    if (mapImage && button.dataset.mapImage) {
      mapImage.src = button.dataset.mapImage;
      mapImage.alt = button.dataset.mapAlt || "지역별 센터 안내 지도";
    }
  };

  centerSection.querySelectorAll(".regional-centers__main-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const targetPanel = centerSection.querySelector(`#${button.dataset.centerPanel}`);

      centerSection.querySelectorAll(".regional-centers__main-tab").forEach((tab) => {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
      });

      centerSection.querySelectorAll(".regional-centers__panel").forEach((panel) => {
        panel.classList.remove("is-active");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      if (!targetPanel) return;
      targetPanel.classList.add("is-active");

      const firstSubTab = targetPanel.querySelector(".regional-centers__sub-tab");
      if (firstSubTab) activateSubTab(firstSubTab);
    });
  });

  centerSection.querySelectorAll(".regional-centers__sub-tab").forEach((button) => {
    button.addEventListener("click", () => activateSubTab(button));
  });
})();
