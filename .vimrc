" Always add a comment before each configuration
" rule. If the config file gets long, it may be hard
" to remember what each configuration does. For the
" same reason, try to use longer commands than the
" shortcuts.

" leader is comma
let mapleader=","

" set color scheme
colorscheme elflord

" enable syntax processing
syntax enable

" load filetype-specific indent files
filetype indent plugin on

" show line numbers
set number

" show command in bottom bar
set showcmd

" show ruler in bottom right
set ruler

" visual autocomplete for command menu
set wildmenu

" redraw only when need to
set lazyredraw

" highlight matching [{()}]
set showmatch

" search as characters are entered
set incsearch

" highlight matches
set hlsearch

" enable folding
set foldenable

" open most folds by default
set foldlevelstart=5

" 5 nested fold max
set foldnestmax=5

" fold based on indent level
set foldmethod=indent

" space open/closes folds
nnoremap <space> za

" turn off search highlight with <leader> + <space>
nnoremap <leader><space> :nohlsearch<CR>

" press <leader> + c for cursorline and column
:hi CursorLine   cterm=NONE ctermbg=darkred ctermfg=white guibg=darkred guifg=white
:hi CursorColumn cterm=NONE ctermbg=darkred ctermfg=white guibg=darkred guifg=white
:nnoremap <Leader>c :set cursorline! cursorcolumn!<CR>


