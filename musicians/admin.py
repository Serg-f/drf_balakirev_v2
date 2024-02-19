from django.contrib import admin

from .models import Musician, Instrument, Style


@admin.register(Style)
class StyleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Instrument)
class InstrumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Musician)
class MusicianAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age', 'instrument', 'is_published', 'created', 'updated')
    list_filter = ('instrument', 'is_published', 'created', 'updated')
    search_fields = ('name', 'description')
    list_editable = ('is_published',)
    list_display_links = ('id', 'name')
