
// folder functions: khai báo các hàm được sử dụng chung trong component.

export default function handleToast() {

    const Toast = ({ option }: {option: {type: string, message: string, title: string} }) => {
      const main = document.getElementById('toast'); // lấy ra element có id = toast
    if (main) {
      const toast = document.createElement('div'); // tạo ra 1 thẻ div

      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamtion-circle',
        danger: 'fas fa-exclamtion-danger',
      } as any;

      const icon = icons[option.type];

      toast.classList.add('toast', `toast--${option.type}`);
      // add class 'toast' vào thẻ div vừa tạo phía trên

      toast.innerHTML = `
          <div class="toast__icon">
              <i class="${icon}"></i>
          </div>
  
          <div class="toast__body">
              <h3 class="toast__title">${option.title}</h3>
              <p class="toast__msg">${option.message} </p>                    
          </div>
          <div class="toast__close">
              <i class="fa fa-times"></i>
          </div>
        `;

      main.appendChild(toast);

      const autoRemoveId = setTimeout(() => {
        main.removeChild(toast);
      }, 4000);
      // sau 3s, remove thằng toast

      toast.onclick = function (event: any) {
        if (event.target.closest('.toast__close')) {
          console.log(event);
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
   
    }
    }

    return Toast;
}
