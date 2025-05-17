document.addEventListener('DOMContentLoaded', function() {
    // State management
    const state = {
        fontSize: 16,
        isGrayscale: false,
        currentTheme: 'default'
    };
    
    // Helper function to check if element is part of accessibility controls
    function isAccessibilityControl(element) {
        return element.closest('.accessibility-item') || 
               element.closest('.accessibility-menu') || 
               element.classList.contains('accessibility-item') || 
               element.classList.contains('accessibility-menu');
    }

    // Helper function to update Plotly graph colors
    function updatePlotlyColors(theme) {
        const plotDiv = document.querySelector('.plotly-graph-div');
        if (!plotDiv) return;

        let update = {};
        
        switch(theme) {
            case 'grayscale':
                update = {
                    'marker.color': 'rgb(128, 128, 128)',
                    'paper_bgcolor': '#111',
                    'plot_bgcolor': '#111'
                };
                break;
            case 'high-contrast':
                update = {
                    'marker.color': 'white',
                    'paper_bgcolor': 'black',
                    'plot_bgcolor': 'black'
                };
                break;
            case 'negative-contrast':
                update = {
                    'marker.color': 'yellow',
                    'paper_bgcolor': 'black',
                    'plot_bgcolor': 'black'
                };
                break;
            case 'light':
                update = {
                    'marker.color': 'black',
                    'paper_bgcolor': 'white',
                    'plot_bgcolor': 'white'
                };
                break;
            default:
                update = {
                    'marker.color': 'crimson',
                    'paper_bgcolor': '#111',
                    'plot_bgcolor': '#111'
                };
        }

        Plotly.update(plotDiv, {'marker': update}, {
            paper_bgcolor: update.paper_bgcolor,
            plot_bgcolor: update.plot_bgcolor,
            font: { color: theme === 'light' ? 'black' : 'white' }
        });
    }
    
    // Accessibility functions
    document.getElementById('increase-text').addEventListener('click', function(e) {
        e.stopPropagation();
        state.fontSize = Math.min(state.fontSize + 2, 24);
        
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                if (element.tagName.match(/^H[1-6]$/)) {
                    element.style.fontSize = (state.fontSize * 1.5) + 'px';
                } else {
                    element.style.fontSize = state.fontSize + 'px';
                }
            }
        });

        // Update Plotly font size
        const plotDiv = document.querySelector('.plotly-graph-div');
        if (plotDiv) {
            Plotly.relayout(plotDiv, {
                'font.size': state.fontSize
            });
        }
    });
    
    document.getElementById('decrease-text').addEventListener('click', function(e) {
        e.stopPropagation();
        state.fontSize = Math.max(state.fontSize - 2, 12);
        
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                if (element.tagName.match(/^H[1-6]$/)) {
                    element.style.fontSize = (state.fontSize * 1.5) + 'px';
                } else {
                    element.style.fontSize = state.fontSize + 'px';
                }
            }
        });

        // Update Plotly font size
        const plotDiv = document.querySelector('.plotly-graph-div');
        if (plotDiv) {
            Plotly.relayout(plotDiv, {
                'font.size': state.fontSize
            });
        }
    });
    
    document.getElementById('grayscale').addEventListener('click', function(e) {
        e.stopPropagation();
        state.isGrayscale = !state.isGrayscale;
        document.body.style.filter = state.isGrayscale ? 'grayscale(100%)' : 'none';
        if (state.isGrayscale) {
            updatePlotlyColors('grayscale');
        } else {
            updatePlotlyColors('default');
        }
    });
    
    document.getElementById('high-contrast').addEventListener('click', function(e) {
        e.stopPropagation();
        state.currentTheme = 'high-contrast';
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#ffffff';
        
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                element.style.color = '#ffffff';
            }
        });

        updatePlotlyColors('high-contrast');
    });
    
    document.getElementById('negative-contrast').addEventListener('click', function(e) {
        e.stopPropagation();
        state.currentTheme = 'negative-contrast';
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#ffff00';
        
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                element.style.color = '#ffff00';
            }
        });

        updatePlotlyColors('negative-contrast');
    });
    
    document.getElementById('light-background').addEventListener('click', function(e) {
        e.stopPropagation();
        state.currentTheme = 'light';
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
        
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                element.style.color = '#000000';
            }
        });

        updatePlotlyColors('light');
    });
    
    document.getElementById('links-underline').addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.querySelectorAll('a').forEach(link => {
            if (!isAccessibilityControl(link)) {
                link.style.textDecoration = link.style.textDecoration === 'underline' ? 'none' : 'underline';
            }
        });
    });
    
    document.getElementById('readable-font').addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.classList.toggle('dyslexia-font');
        
        const isReadableFont = document.body.classList.contains('dyslexia-font');
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                element.style.fontFamily = isReadableFont ? 'OpenDyslexic, sans-serif' : 'Arial, sans-serif';
            }
        });

        // Update Plotly font
        const plotDiv = document.querySelector('.plotly-graph-div');
        if (plotDiv) {
            Plotly.relayout(plotDiv, {
                'font.family': isReadableFont ? 'OpenDyslexic, sans-serif' : 'Arial, sans-serif'
            });
        }
    });
    
    document.getElementById('reset').addEventListener('click', function(e) {
        e.stopPropagation();
        // Reset state
        state.fontSize = 16;
        state.isGrayscale = false;
        state.currentTheme = 'default';
        
        // Reset all styles
        document.body.style.filter = 'none';
        document.body.style.backgroundColor = '#111';
        document.body.style.color = '#ffffff';
        document.body.classList.remove('dyslexia-font');
        
        document.body.querySelectorAll('*').forEach(element => {
            if (!isAccessibilityControl(element)) {
                element.style.color = '';
                element.style.fontFamily = '';
                element.style.fontSize = '';
                if (element.tagName === 'A') {
                    element.style.textDecoration = '';
                }
            }
        });

        // Reset Plotly graph
        updatePlotlyColors('default');
    });
}); 