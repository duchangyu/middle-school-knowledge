// ===== 全局交互工具库 =====

// 通用练习题逻辑
function initQuiz(quizId, answers) {
  const quiz = document.getElementById(quizId);
  if (!quiz) return;
  const options = quiz.querySelectorAll('.quiz-option');
  const feedback = quiz.querySelector('.quiz-feedback');
  options.forEach(opt => {
    opt.addEventListener('click', function() {
      const idx = parseInt(this.dataset.idx);
      // 清除之前的选择
      options.forEach(o => o.classList.remove('selected', 'correct-answer', 'wrong-answer'));
      this.classList.add('selected');
      if (idx === answers.correct) {
        this.classList.add('correct-answer');
        quiz.classList.add('correct');
        quiz.classList.remove('wrong');
        if (feedback) {
          feedback.innerHTML = '<span style="color: #27AE60;">✓ 正确！</span> ' + (answers.explain || '');
          feedback.style.display = 'block';
        }
      } else {
        this.classList.add('wrong-answer');
        quiz.classList.add('wrong');
        quiz.classList.remove('correct');
        options[answers.correct].classList.add('correct-answer');
        if (feedback) {
          feedback.innerHTML = '<span style="color: #E74C3C;">✗ 再想想</span> ' + (answers.hint || '');
          feedback.style.display = 'block';
        }
      }
    });
  });
}

// 滑块值实时显示
function bindSlider(sliderId, displayId, callback) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);
  if (!slider) return;
  const update = () => {
    if (display) display.textContent = slider.value;
    if (callback) callback(parseFloat(slider.value));
  };
  slider.addEventListener('input', update);
  update();
}

// 标签页切换
function initTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabs = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = container.querySelector(`#tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// 折叠/展开
function toggleSection(header) {
  const content = header.nextElementSibling;
  if (content) {
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    header.classList.toggle('collapsed');
  }
}

// 进度存储（localStorage）
const Progress = {
  save: function(subject, chapter, status) {
    const key = 'progress_' + subject + '_' + chapter;
    localStorage.setItem(key, status);
  },
  get: function(subject, chapter) {
    return localStorage.getItem('progress_' + subject + '_' + chapter) || 'pending';
  },
  getSubjectProgress: function(subject, chapters) {
    let done = 0;
    chapters.forEach(ch => {
      if (this.get(subject, ch) === 'done') done++;
    });
    return Math.round((done / chapters.length) * 100);
  }
};

// 动画帧辅助
function animateValue(element, start, end, duration, suffix) {
  suffix = suffix || '';
  const range = end - start;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = start + range * progress;
    element.textContent = current.toFixed(1) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
