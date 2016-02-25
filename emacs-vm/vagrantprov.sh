#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y sbcl
sudo apt-get install -y emacs24
sudo apt-get install -y git
sudo apt-get install -y tmux

curl -O https://beta.quicklisp.org/quicklisp.lisp
sbcl --load quicklisp.lisp \
     --eval '(quicklisp-quickstart:install)' \
     --eval '(ql:quickload "quicklisp-slime-helper")' \
     --quit

rm -f quicklisp.lisp

cat <<EOF > .sbclrc
#-quicklisp
(let ((quicklisp-init (merge-pathnames "quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))
EOF

cat <<EOF > .emacs
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

(menu-bar-mode -1)
EOF

cat <<EOF > .tmuxrc
# use C-t for tmux prefix, as C-b isn't emacs-friendly
unbind C-b
set -g prefix C-t
bind C-t send-prefix
EOF
