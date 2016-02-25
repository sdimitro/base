(require 'package)
(add-to-list 'package-archives
	     '("melpa" . "https://melpa.org/packages/"))
(package-initialize)
                                                                                 
(or (file-exists-p package-user-dir)
    (package-refresh-contents))                                                  

(dolist (package '(paredit smex))
  (unless (package-installed-p package)
    (package-install package)))                                                  

(global-set-key (kbd "M-x") 'smex)

(ido-mode 1)
                                                                                 
(autoload 'enable-paredit-mode "paredit")
(mapcar (lambda (hook)
	  (add-hook hook #'enable-paredit-mode))
	'(lisp-mode-hook
	   lisp-interaction-mode-hook
	   slime-repl-mode-hook))                                               
                                                                                 
(add-hook 'slime-repl-mode-hook
	  (lambda ()
	    (define-key slime-repl-mode-map (kbd "DEL") nil)))                   

(load (expand-file-name "~/quicklisp/slime-helper.el"))
(slime-setup '(slime-fancy))

(setq inferior-lisp-program "sbcl")
(setq slime-auto-connect 'ask)

(menu-bar-mode -1)

(require 'evil)
(evil-mode 1)

(require 'linum)
(defun linum-format-func (line)
  (let ((w (length (number-to-string (count-lines (point-min) (point-max))))))
    (propertize (format (format "%%%dd " w) line) 'face 'linum)))
(setq linum-format 'linum-format-func)
