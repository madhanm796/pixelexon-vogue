@echo off
setlocal

echo ==========================================
echo Pixelexon Vogue - Asset Migration
echo ==========================================

REM ===========================
REM TOKENS
REM ===========================

move "assets\styles\tokens\colors.css"          "assets\token-colors.css"
move "assets\styles\tokens\containers.css"      "assets\token-containers.css"
move "assets\styles\tokens\radius.css"          "assets\token-radius.css"
move "assets\styles\tokens\shadows.css"         "assets\token-shadows.css"
move "assets\styles\tokens\spacing.css"         "assets\token-spacing.css"
move "assets\styles\tokens\transitions.css"     "assets\token-transitions.css"
move "assets\styles\tokens\typography.css"      "assets\token-typography.css"
move "assets\styles\tokens\z-index.css"         "assets\token-z-index.css"

REM ===========================
REM BASE
REM ===========================

move "assets\styles\base\reset.css"             "assets\base-reset.css"
move "assets\styles\base\document.css"          "assets\base-document.css"
move "assets\styles\base\accessibility.css"     "assets\base-accessibility.css"

REM ===========================
REM LAYOUT
REM ===========================

move "assets\styles\layout\container.css"       "assets\layout-container.css"
move "assets\styles\layout\grid.css"            "assets\layout-grid.css"
move "assets\styles\layout\section.css"         "assets\layout-section.css"
move "assets\styles\layout\stack.css"           "assets\layout-stack.css"

REM ===========================
REM COMPONENTS
REM ===========================

move "assets\styles\components\badge.css"       "assets\component-badge.css"
move "assets\styles\components\button.css"      "assets\component-button.css"
move "assets\styles\components\card.css"        "assets\component-card.css"
move "assets\styles\components\drawer.css"      "assets\component-drawer.css"
move "assets\styles\components\input.css"       "assets\component-input.css"
move "assets\styles\components\modal.css"       "assets\component-modal.css"
move "assets\styles\components\spinner.css"     "assets\component-spinner.css"

REM ===========================
REM SECTIONS
REM ===========================

move "assets\styles\sections\footer.css"        "assets\section-footer.css"
move "assets\styles\sections\header.css"        "assets\section-header.css"
move "assets\styles\sections\hero.css"          "assets\section-hero.css"

REM ===========================
REM CLEANUP
REM ===========================

rmdir "assets\styles\tokens"
rmdir "assets\styles\base"
rmdir "assets\styles\layout"
rmdir "assets\styles\components"
rmdir "assets\styles\sections"
rmdir "assets\styles\utilities"
rmdir "assets\styles\animations"
rmdir "assets\styles"

echo.
echo ==========================================
echo Migration Completed
echo ==========================================

pause